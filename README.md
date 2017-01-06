== README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...


#データベース設計

##users
id
name        :string   ,null:false, add_index
email       :string   ,null:false, unique: true
password    :string   ,null:false

##messages
id
body        :text     ,null:false
image       :string
group_id    :integer
user_id     :integer  ,null:false

##groups
id
name        :string   ,null:false

##group_users
id
group_id    :integer  ,null:false
user_id     :integer  ,null:false
