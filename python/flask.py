from flask         import Flask, jsonify, request, g, Response, current_app
from sqlalchemy    import create_engine, text
from datetime      import datetime, timedelta
from flask_cors import CORS

#####################################
# Library
####################################
def create_user(new_user):
    return current_app.database.execute(text("""
        INSERT INTO users (
            name,
            email,
            hashed_password,
            account_id
        ) SELECT 
            :name,
            :email,
            :password,
            accnt.id
        FROM accounts as accnt
        WHERE accnt.account_type = :account_type
    """), new_user).rowcount

def get_all_users():
    rows = current_app.database.execute(text(""" 
        SELECT  
            u.id,
            u.name,
            u.email,
            accnt.account_type
        FROM users as u 
        JOIN accounts accnt ON u.account_id = accnt.id 
    """)).fetchall()

    return [{ 
        'id'           : row['id'],
        'name'         : row['name'],
        'email'        : row['email'],
        'account_type' : row['account_type']
    } for row in rows]

def get_user_info(id):
    sql = text("""
        SELECT
            u.id,
            u.name,
            u.email,
            accnt.account_type
        FROM users as u 
        JOIN accounts accnt ON u.account_id = accnt.id 
        WHERE u.id = :id
    """)
    parameters = {'id' : id}
    row        = current_app.database.execute(sql, parameters).fetchone()

    return {
        'id'           : row['id'],
        'name'         : row['name'],
        'email'        : row['email'],
        'account_type' : row['account_type']
    }  if row else None


#####################################
# Flask App
####################################
def create_app(test_config = None):
    app = Flask(__name__)

    CORS(app)

    if test_config is None:
        app.config.from_pyfile("config.py")
    else:
        app.config.update(test_config)

    database = create_engine(
      app.config['DB_URL'], 
      encoding = 'utf-8', 
      max_overflow = 0)
    app.database = database

    ################################
    # End Points
    ################################

    @app.route('/ping', methods=['GET'])
    def ping():
        return "pong"

    @app.route('/users', methods=['GET'])
    def all_users():
        return jsonify(get_all_users())

    @app.route('/user/<int:id>', methods=['GET']) ## /user/1 
    def get_user(id):
        row = get_user_info(id)

        return jsonify({
            'id'           : row['id'],
            'name'         : row['name'],
            'email'        : row['email'],
            'account_type' : row['account_type']
        })  if row else ('', 404)

    @app.route('/user', methods=['POST'])
    def create_user_endpoint():
        new_user = request.json
        rowcount = create_user(new_user)

        return jsonify(get_all_users()) if rowcount == 1 else ('', 500)

    return app

if __name__ == '__main__':
  app = create_app()

  app.run(debug=True)