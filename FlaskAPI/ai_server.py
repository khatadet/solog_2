# Server Side
from flask_restful import Api
from flask_cors import CORS
from ent.ent import db,app

cors = CORS(app, resources={r"/*": {"origins": "*"}})

from controllers.Respon_Ai import Respon_Ai
from controllers.Respon_Ai_Array import Respon_Ai_Array
from ent import ent

#database

app.config['SQLALCHEMY_DATABASE_URI']="sqlite:///ent.db"
app.app_context().push()
api=Api(app)
db.init_app(app)
db.create_all()



api.add_resource(Respon_Ai,"/Respon_Ai")
api.add_resource(Respon_Ai_Array,"/Respon_Ai_Array")
if __name__ == "__main__":
    app.run(debug=True,host="0.0.0.0")