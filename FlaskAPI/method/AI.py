# AI Side
import numpy as np
import pandas as pd

import tensorflow as tf
from tensorflow import keras

import PIL  
from PIL import Image
import io
from io import BytesIO

import base64
from datetime import datetime


# AI Side
def ai(img_string,img__type,model):

    
    imgdata = base64.b64decode(img_string)
    img_height = 180
    img_width = 180
    
    #model = tf.keras.models.load_model(r"C:\Users\PON\Documents\hac_2\FlaskAPI\malon.h5")
    class_names = ['Downy_mildew_on_melons', 'Healthy_melon', 'Powdery_mildew_on_melons']
    class_names_v =['Not_melon', 'melon']
    

    img_PLT_jpeg = Image.open(io.BytesIO(imgdata))
    #img_PLT_image = img_PLT_jpeg.crop((0, 0, img_height, img_width))
    #img_PLT_image.thumbnail(size=(img_height, img_width))
    b = BytesIO()
    img = img_PLT_jpeg.resize((img_height, img_width), Image.ANTIALIAS)
    
    
    
    img = img.convert('RGB')
    
    img.save(b,format='jpeg')
    
    
    img_array = keras.preprocessing.image.img_to_array(img)
    
    img_array = tf.expand_dims(img_array, 0) # Create a batch
    img_array_nomol = img_array

    """
    cack = model.predict(img_array)
    
    score_cack = tf.nn.softmax(cack[0])
    print(list(cack[0]))
    print(class_names_v[np.argmax(tf.nn.softmax(cack[0]))],'-------------------------------------')
    if np.argmax(score_cack) == 0:
        
        return {"res":class_names_v[np.argmax(score_cack)],"target":"not malon","%":100 * np.max(score_cack)}
    """
    
    model=model
    predictions = model.predict(img_array_nomol)
    score = tf.nn.softmax(predictions[0])
    respon = (
        "This image most likely belongs to {} with a {:.2f} percent confidence."
        .format(class_names[np.argmax(score)], 100 * np.max(score))
    )
    
    
    
    
    
    

    img_res = (base64.b64encode(b.getvalue())).decode("ascii")
    return {
        "res":respon,
        "target":class_names[np.argmax(score)],
        "%":100 * np.max(score),
        "index_target":np.argmax(score),
        "img_res": img_res }
