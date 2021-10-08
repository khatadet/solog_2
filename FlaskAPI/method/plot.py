import base64
import numpy as np
import matplotlib.pyplot as plt
from PIL import Image
import io
import sys
import matplotlib
matplotlib.use('TkAgg')


def plot_Data_res(data, name):

    data_num = data.copy()
    data_class = name.copy()

    for i in range(len(data), 0, -1):
        if(data_num[i-1] == 0):
            print('i =', i)
            data_num.pop(i-1)
            data_class.pop(i-1)
    myexplode = [0]*len(data_num)
    myexplode[data_num.index(max(data_num))] = 0.2
    print('---------0.1-----------')
    fig1, ax1 = plt.subplots()
    ax1.pie(data_num, explode=myexplode, labels=data_class, autopct='%1.1f%%',
            shadow=True, startangle=90)
    print('---------0.0-----------')
    # Equal aspect ratio ensures that pie is drawn as a circle.
    ax1.axis('equal')
    #plt.pie(data, labels = name, explode = myexplode, shadow = True)

    print('---------0.2-----------')
    buf = io.BytesIO()
    plt.savefig(buf, format='jpg')
    plt.cla()
    img_str = (base64.b64encode(buf.getvalue())).decode("ascii")
    return img_str
