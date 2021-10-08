

# Server Side
from flask import Flask
from flask_restful import Resource,reqparse
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app=Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "*"}})

from datetime import datetime
from method import AI ,pypdf,plot
import tensorflow as tf
from ent.ent import DatasetModel
model = tf.keras.models.load_model("method/solog.h5")



#Request Parser
Dataset_add_args=reqparse.RequestParser()
Dataset_add_args.add_argument("img",type=str,required=True,help="กรุณาใส่ข้อมูล")
Dataset_add_args.add_argument("target",type=str,required=True,help="กรุณาระบุอุณหภูมิเป็นตัวอักษร")

db=SQLAlchemy(app)

class Respon_Ai(Resource):

    
    def post(self):
        try:   
           
            img_type = ""
            args=Dataset_add_args.parse_args()
            img_data=args["img"]
            
            img_type = (img_data.split(";base64,")[0]).split("data:image/")[-1]
            img_string = img_data.split(";base64,")[-1]
            
            res = AI.ai(img_string,img_type,model=model)
            
            
            pdf = pypdf.create_new_PDF()
            
            pdf = pypdf.create_newpage_PDF(Pdf=pdf,img= res["img_res"],txt=res["res"])
            pdf = pypdf.save_PDF(pdf)
            
            date = datetime.now()
            
            Dataset=DatasetModel(img=res["img_res"],target=res["target"],date=date)
            
            db.session.add(Dataset)
            
            db.session.commit()
            
            
            return { "status": True,"res":res["res"],"pdf": 'data:application/pdf;base64,'+pdf},201

        except :
            return {"error":"ไม่สามารถดำเนินการได้"},401
    #@marshal_with(resource_Dataset_field)        
    def patch(self):
        try:
            args=Dataset_add_args.parse_args()
            img_data=args["img"]
            if "data:image/" in img_data:
                img_data = img_data[10:]
            print(img_data[0:50])
        
            return {"status": True,"data": True,"res":"patch ทำงานได้"},201
        except :
            return {"error":"ไม่สามารถดำเนินการได้"},401
    def get(self):
        
        return {"res":"ทำงาน "},200
 