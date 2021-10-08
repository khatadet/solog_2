from fpdf import FPDF
import io
from io import BytesIO
import base64

from datetime import datetime
from functools import wraps
import math
import errno
import os, sys, zlib, struct, re, tempfile, struct

from fpdf.ttfonts import TTFontFile
from fpdf.fonts import fpdf_charwidths
from fpdf.php import substr, sprintf, print_r, UTF8ToUTF16BE, UTF8StringToArray
from fpdf.py3k import PY3K, pickle, urlopen, Image, basestring, unicode, exception, b, hashpath
from pythainlp.tokenize import syllable_tokenize

class PDF(FPDF):
    
    def image_byte(self, name, x=None, y=None, w=0,h=0,type='jpg',link=''):
        "Put an image on the page"
        
        if(type=='jpg'):
            info=self._parsejpg_byte(name)
        elif(type=='png'):
            info=self._parsepng_byte(name)
        info['i']=len(self.images)+1
        self.images[name]=info
        
        #Automatic width and height calculation if needed
        if(w==0 and h==0):
            #Put image at 72 dpi
            w=info['w']/self.k
            h=info['h']/self.k
        elif(w==0):
            w=h*info['w']/info['h']
        elif(h==0):
            h=w*info['h']/info['w']
        # Flowing mode
        if y is None:
            if (self.y + h > self.page_break_trigger and not self.in_footer and self.accept_page_break()):
                #Automatic page break
                x = self.x
                self.add_page(self.cur_orientation)
                self.x = x
            y = self.y
            self.y += h
        if x is None:
            x = self.x
        self._out(sprintf('q %.2f 0 0 %.2f %.2f %.2f cm /I%d Do Q',w*self.k,h*self.k,x*self.k,(self.h-(y+h))*self.k,info['i']))
        if(link):
            self.link(x,y,w,h,link)
        


    def _parsejpg_byte(self, data):
        # Extract info from a JPEG file
        try:
            f = io.BytesIO(data)
            while True:
                markerHigh, markerLow = struct.unpack('BB', f.read(2))
                if markerHigh != 0xFF or markerLow < 0xC0:
                    raise SyntaxError('No JPEG marker found')
                elif markerLow == 0xDA: # SOS
                    raise SyntaxError('No JPEG SOF marker found')
                elif (markerLow == 0xC8 or # JPG
                      (markerLow >= 0xD0 and markerLow <= 0xD9) or # RSTx
                      (markerLow >= 0xF0 and markerLow <= 0xFD)): # JPGx
                    pass
                else:
                    dataSize, = struct.unpack('>H', f.read(2))
                    data = f.read(dataSize - 2) if dataSize > 2 else ''
                    if ((markerLow >= 0xC0 and markerLow <= 0xC3) or # SOF0 - SOF3
                        (markerLow >= 0xC5 and markerLow <= 0xC7) or # SOF4 - SOF7
                        (markerLow >= 0xC9 and markerLow <= 0xCB) or # SOF9 - SOF11
                        (markerLow >= 0xCD and markerLow <= 0xCF)): # SOF13 - SOF15
                        bpc, height, width, layers = struct.unpack_from('>BHHB', data)
                        colspace = 'DeviceRGB' if layers == 3 else ('DeviceCMYK' if layers == 4 else 'DeviceGray')
                        break
        except Exception:
            self.error('Missing or incorrect image file: %s. error: %s' % (type(data), str(exception())))

        # Read whole file from the start
        f.seek(0)
        data = f.read()
        f.close()
        return {'w':width,'h':height,'cs':colspace,'bpc':bpc,'f':'DCTDecode','data':data}


    def _parsepng_byte(self, data):
        #Extract info from a PNG file
        
        f = io.BytesIO(data)
        name = "data ", str(len(data))
        if(not f):
            self.error("Can't open image file: "+name)
        #Check signature
        magic = f.read(8).decode("latin1")
        signature = '\x89'+'PNG'+'\r'+'\n'+'\x1a'+'\n'
        if not PY3K: signature = signature.decode("latin1")
        if(magic!=signature):
            self.error('Not a PNG file: '+name)
        #Read header chunk
        f.read(4)
        chunk = f.read(4).decode("latin1")
        if(chunk!='IHDR'):
            self.error('Incorrect PNG file: '+name)
        w=self._freadint(f)
        h=self._freadint(f)
        bpc=ord(f.read(1))
        if(bpc>8):
            self.error('16-bit depth not supported: '+name)
        ct=ord(f.read(1))
        if(ct==0 or ct==4):
            colspace='DeviceGray'
        elif(ct==2 or ct==6):
            colspace='DeviceRGB'
        elif(ct==3):
            colspace='Indexed'
        else:
            self.error('Unknown color type: '+name)
        if(ord(f.read(1))!=0):
            self.error('Unknown compression method: '+name)
        if(ord(f.read(1))!=0):
            self.error('Unknown filter method: '+name)
        if(ord(f.read(1))!=0):
            self.error('Interlacing not supported: '+name)
        f.read(4)
        dp='/Predictor 15 /Colors '
        if colspace == 'DeviceRGB':
            dp+='3'
        else:
            dp+='1'
        dp+=' /BitsPerComponent '+str(bpc)+' /Columns '+str(w)+''
        #Scan chunks looking for palette, transparency and image data
        pal=''
        trns=''
        data=bytes() if PY3K else str()
        n=1
        while n != None:
            n=self._freadint(f)
            type=f.read(4).decode("latin1")
            if(type=='PLTE'):
                #Read palette
                pal=f.read(n)
                f.read(4)
            elif(type=='tRNS'):
                #Read transparency info
                t=f.read(n)
                if(ct==0):
                    trns=[ord(substr(t,1,1)),]
                elif(ct==2):
                    trns=[ord(substr(t,1,1)),ord(substr(t,3,1)),ord(substr(t,5,1))]
                else:
                    pos=t.find('\x00'.encode("latin1"))
                    if(pos!=-1):
                        trns=[pos,]
                f.read(4)
            elif(type=='IDAT'):
                #Read image data block
                data+=f.read(n)
                f.read(4)
            elif(type=='IEND'):
                break
            else:
                f.read(n+4)
        if(colspace=='Indexed' and not pal):
            self.error('Missing palette in '+name)
        f.close()
        info = {'w':w,'h':h,'cs':colspace,'bpc':bpc,'f':'FlateDecode','dp':dp,'pal':pal,'trns':trns,}
        if(ct>=4):
            # Extract alpha channel
            data = zlib.decompress(data)
            color = b('')
            alpha = b('')
            if(ct==4):
                # Gray image
                length = 2*w
                for i in range(h):
                    pos = (1+length)*i
                    color += b(data[pos])
                    alpha += b(data[pos])
                    line = substr(data, pos+1, length)
                    re_c = re.compile('(.).'.encode("ascii"), flags=re.DOTALL)
                    re_a = re.compile('.(.)'.encode("ascii"), flags=re.DOTALL)
                    color += re_c.sub(lambda m: m.group(1), line)
                    alpha += re_a.sub(lambda m: m.group(1), line)
            else:
                # RGB image
                length = 4*w
                for i in range(h):
                    pos = (1+length)*i
                    color += b(data[pos])
                    alpha += b(data[pos])
                    line = substr(data, pos+1, length)
                    re_c = re.compile('(...).'.encode("ascii"), flags=re.DOTALL)
                    re_a = re.compile('...(.)'.encode("ascii"), flags=re.DOTALL)
                    color += re_c.sub(lambda m: m.group(1), line)
                    alpha += re_a.sub(lambda m: m.group(1), line)
            del data
            data = zlib.compress(color)
            info['smask'] = zlib.compress(alpha)
            if (self.pdf_version < '1.4'):
                self.pdf_version = '1.4'
        info['data'] = data
        return info


    def header(self):
        # Logo
        self.image(r'D:\Hackathon\FlaskAPI\controllers\solog.jpg', 10, 8, 33)
        # Arial bold 15
        self.set_font('Arial', 'B', 15)
        # Move to the right
        self.cell(80)
        # Title
        #self.cell(30, 10, 'Title', 1, 0, 'C')
        # Line break
        self.ln(30)

    # Page footer
    def footer(self):
        # Position at 1.5 cm from bottom
        self.set_y(-15)
        # Arial italic 8
        self.set_font('Arial', 'I', 8)
        # Page number
        self.cell(0, 10, 'Page ' + str(self.page_no()) + '/{nb}', 0, 0, 'C')
    
    

    def list_mulit_call_thai(self,text,len_str):
        # '$$$' == '\n'
        # '$$&' == '    '
        def len_token_thai(text):
            a= [ "ู" , "ุ" , "ึ" , "๊" , "ี" , "ํ" , "ั" , "็" , "้" , "๋" , "่" , "." , "์" , "ื" , "ิ" , "ฺ" ,]
            count=0
            for j in text:
                if(j not in a):
                    count+=1
            return count
        
        if str(type(text))== "<class 'str'>":
            token = syllable_tokenize(text)
            count = 0
            word = ''
            arr_word = []
            for i in token:
                count+=len_token_thai(i)
                if i != '$$$':
                    if i!= '$$&':
                        word += i
                    else :
                        word += '    '
                if(count>70)or(i == '$$$'):
                    count = 0
                    
                    arr_word.append(word)
                    word = ''
            arr_word.append(word)
            return arr_word
        elif str(type(text))== "<class 'list'>":
            count = 0
            word = ''
            arr_word = []
            for j in text:
                token = syllable_tokenize(j)
                for i in token:
                    count+=len_token_thai(i)
                    if i != '$$$':
                        if i!= '$$&':
                            word += i
                        else :
                            word += '    '
                    if(count>70)or(i == '$$$'):
                        count = 0
                        
                        arr_word.append(word)
                        word = ''
            arr_word.append(word)
            return arr_word
        else:
            return text

