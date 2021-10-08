import numpy
import base64
from method.PDF_class import PDF
from method import data_report
def create_new_PDF():
    
    pdf = PDF('P', 'mm', 'A4')
    
    return pdf

def create_newpage_PDF(Pdf,img,txt):
    
    pdf = Pdf

    pdf.add_page()
    
    imgdata = base64.b64decode(img)
    pdf.set_font('Arial', 'I', 30)
    pdf.image_byte(imgdata,75,20,60)
    pdf.ln(40)
    pdf.cell(0, 20, '',0 , 1 , 'C' )
    pdf.cell(0, 20, '',0 , 1 , 'C' )
    pdf.set_font('Arial', 'B', 20)
    

    
    pdf.set_font('Arial', 'I', 20)
    pdf.multi_cell(0, 20, '     '+txt)

    return pdf

def create_Res_PDF(Pdf, data_num, data_name):
    
    pdf = Pdf
    pdf.add_page()
    pdf.add_font('THSarabun_31', '', r'method\THSarabun.ttf', uni='in')
    pdf.set_font('THSarabun_31', '', 20)


    
    data = data_report.data

    val = data_num
    o = 0
    for i in data[data_name]:

        if(val > i['degree'][0]) and (val <= i['degree'][1]):
            o = int(i['No'])
    pdf.ln(h=5)
    pdf.cell(0, 20, "อาการที่พบ")
    pdf.ln(h=7)
    
    pdf.cell(0, 20, data[data_name][o]['Symptoms'])
    pdf.ln(h=7)
    pdf.ln(h=5)
    pdf.cell(0, 20, "วัตถุประสงค์การให้คำแนะนำ")
    pdf.ln(h=7)
    pdf.cell(0, 20, data[data_name][o]['Recommendation_purpose'])
    pdf.ln(h=7)
    pdf.ln(h=5)
    pdf.cell(0, 20, "วิธีที่แนะนำ")
    pdf.ln(h=7)
    ma = pdf.list_mulit_call_thai((data[data_name][o]['Recommended_method']),70)
    for i in ma:
        pdf.cell(0, 20, i)
        pdf.ln(h=7)
    pdf.ln(h=5)
    
    pdf.cell(0, 20, "แหล่งที่มาของข้อมูล")
    pdf.ln(h=10)
    pdf.set_font('THSarabun_31', '', 10)
    for i in (data[data_name][o]['refer_arr']):
        test_refer = i["refer"]

        if i["url"]:
            pdf.cell(0, 20, test_refer, link=i["url"])
            pdf.ln(h=7)
        else:
            pdf.cell(0, 20, test_refer)
            pdf.ln(h=7)
    
    return pdf


def create_SumResPage_PDF(Pdf,img,data_num,data_name):
    
    
    summary = (numpy.array(data_num) / sum(data_num))*100
    

    pdf = Pdf

    pdf.add_page()
    
    imgdata = base64.b64decode(img)
    pdf.set_font('Arial', 'I', 30)
    pdf.image_byte(imgdata,60,30,100)
    pdf.ln(50)

    
    

    """
    if summary[0]>0:
        create_Res_PDF(pdf,summary[0],data_name[0])
    if summary[2]>0:
        create_Res_PDF(pdf,summary[2],data_name[2])
    """
    return pdf



def save_PDF(Pdf):
    
    pdf = Pdf
    title = 'solog'
    pdf.set_title(title)
    pdf.alias_nb_pages()
    e = pdf.output('','S')

    r = e.encode("latin1")

    print(type(r))

    base64_string = base64.b64encode(r).decode("ascii")

    #sample_string_bytes = base64.b64decode(base64_string)
    return base64_string