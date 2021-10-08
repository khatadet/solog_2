

# Server Side
from flask import Flask
from flask_restful import Api,Resource,abort,reqparse,marshal_with,fields
from flask_sqlalchemy import SQLAlchemy,Model
from flask_cors import CORS

app=Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "*"}})

from datetime import datetime
from method import AI ,pypdf,plot
import tensorflow as tf
from ent.ent import DatasetModel
model = tf.keras.models.load_model(r"method\solog.h5")

Dataset_add_args_arr=reqparse.RequestParser()
Dataset_add_args_arr.add_argument("img_arr",action='append')
Dataset_add_args_arr.add_argument("target",type=str,required=True,help="กรุณาระบุอุณหภูมิเป็นตัวอักษร")

app=Flask(__name__)
db=SQLAlchemy(app)

resource_Dataset_field={
    "id":fields.Integer,
    "img":fields.String,
    "target":fields.String,
    "date":fields.DateTime,
}
    
class Respon_Ai_Array(Resource):

    
    def post(self):
        try:   
            img_type =""
            args=Dataset_add_args_arr.parse_args()
            
            arr = []
            class_names = ['Downy_mildew_on_melons', 'Healthy_melon', 'Powdery_mildew_on_melons']
            class_sum=[0] * 3
            i,j = 0 ,len(args["img_arr"])
            pdf = pypdf.create_new_PDF()
            
            
            for img_data_i in args["img_arr"]:
                message = ''
                
                try:
                    img_type = (img_data_i.split(";base64,")[0]).split("data:image/")[-1]
                    img_data = img_data_i.split(";base64,")[-1]
                    res = AI.ai(img_data,img_type,model=model)
                    date = datetime.now()
                    
                    Dataset=DatasetModel(img=img_data,target=res["target"],date=date)
                    db.session.add(Dataset)
                    db.session.commit()
                    message = res["res"]
                    img_res = 'data:image/jpeg;base64,'+res["img_res"]
                    class_sum[res["index_target"]]+=1
                    
                    
                    pdf = pypdf.create_newpage_PDF(Pdf=pdf,img= res["img_res"],txt=res["res"])
                except :
                    message = "ไม่สามารถอ่านได้"
                    img_res = img_data_i
                c = {"img":img_res , "res" : message }
                
                arr.append(c)
                i += 1
                print("+++++++++++++++++++||||||",i,"---",j,"||||||+++++++++++++++++++++++++")
            
            img_plot = plot.plot_Data_res(class_sum,class_names)
            
            c = {"img":'data:image/jpeg;base64,'+img_plot , "res" : str(class_sum) }
            arr.append(c)
            
            pdf = pypdf.create_SumResPage_PDF(Pdf=pdf,img= img_plot,data_num=class_sum,data_name=class_names)
            
            print(class_sum)

            pdf = pypdf.save_PDF(pdf)
            #pdf=''

            return { "status": True,"res":arr,"status_res":"ประมวลผลสำเร็จ","pdf": 'data:application/pdf;base64,'+pdf},201
           

        except :
            return {"error":"ไม่สามารถดำเนินการได้"},401
    