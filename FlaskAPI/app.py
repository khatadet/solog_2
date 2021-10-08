# Server Side
from flask import Flask
from flask_restful import Api,Resource,abort,reqparse,marshal_with,fields
from flask_sqlalchemy import SQLAlchemy,Model
app=Flask(__name__)

#database
db=SQLAlchemy(app)
app.config['SQLALCHEMY_DATABASE_URI']="sqlite:///database.db"
api=Api(app)

class CityModel(db.Model):
    id=db.Column(db.Integer,primary_key=True, autoincrement=True)
    name=db.Column(db.String(100),nullable=False)
    temp=db.Column(db.String(100),nullable=False)
    weather=db.Column(db.String(100),nullable=False)
    people=db.Column(db.String(100),nullable=False)

    def __repr__(self):
        return f"City(name={name},temp={temp},weather={weather},people={people})"

db.create_all()

#Request Parser
city_add_args=reqparse.RequestParser()
city_add_args.add_argument("name",type=str,required=True,help="กรุณาระบุชื่อจังหวัดด้วยครับ")
city_add_args.add_argument("temp",type=str,required=True,help="กรุณาระบุอุณหภูมิเป็นตัวอักษร")
city_add_args.add_argument("weather",required=True,type=str,help="กรุณาระบุสภาพอากาศเป็นตัวอักษร")
city_add_args.add_argument("people",required=True,type=str,help="กรุณาระบุจำนวนประชากรเป็นตัวอักษร")

#Update Request Parser
city_update_args=reqparse.RequestParser()
city_update_args.add_argument("name",type=str,help="กรุณาระบุชื่อจังหวัดที่ต้องการแก้ไข")
city_update_args.add_argument("temp",type=str,help="กรุณาระบุอุณหภูมิที่ต้องการแก้ไข")
city_update_args.add_argument("weather",type=str,help="กรุณาระบุสภาพอากาศที่ต้องการแก้ไข")
city_update_args.add_argument("people",type=str,help="กรุณาระบุจำนวนประชากรที่ต้องการแก้ไข")


resource_field={
    "id":fields.Integer,
    "name":fields.String,
    "temp":fields.String,
    "weather":fields.String,
    "people":fields.String
}


#design
class WeatherCity(Resource):

    @marshal_with(resource_field)
    def get(self,city_id):
        result=CityModel.query.filter_by(id=city_id).first()
        if not result:
            abort(404,message="ไม่พบข้อมูลจังหวัดที่คุณร้องขอ")
        return result

   
    
    @marshal_with(resource_field)
    def patch(self,city_id):
        args=city_update_args.parse_args()
        result=CityModel.query.filter_by(id=city_id).first()
        if not result:
           abort(404,message="ไม่พบข้อมูลจังหวัดที่จะแก้ไข")
        if args["name"]:
            result.name=args["name"] # result.name chonburi => args['name']=ชลบุรี
        if args["temp"]:
            result.temp=args["temp"]
        if args["weather"]:
            result.weather=args["weather"]
        if args["people"]:
            result.people=args["people"]
        
        db.session.commit()
        
        
        return result

#design
class WeatherCity_Pos(Resource):

    @marshal_with(resource_field)
    def post(self):
        
        args=city_add_args.parse_args()
        city=CityModel(name=args["name"],temp=args["temp"],weather=args["weather"],people=args["people"])
        db.session.add(city)
        db.session.commit()
      
        return {"fvcr":"ervcer"},201

#call
api.add_resource(WeatherCity,"/weather/<int:city_id>")
api.add_resource(WeatherCity_Pos,"/weather")
if __name__ == "__main__":
    app.run(debug=True)