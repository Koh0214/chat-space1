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
|column|data type|    keys   |
|:----:|:-------:|:---------:|
|id    |||
|name  |string   |null: false, add_index|
|email |string   |null: false, unique: true|
|password|string |null: false|

##messages
|column|data type|    keys   |
|:----:|:-------:|:---------:|
|id|||
|body|text||
|image|string||
|group_id|integer|foreign_key: true|
|user_id|integer|,null: false, foreign_key: true|


##groups
|column|data type|    keys   |
|:----:|:-------:|:---------:|
|id|||
|name|string|null:false|

##group_users
|column|data type|    keys   |
|:----:|:-------:|:---------:|
|id|||
|group_id|integer|null: false, foreign_key: true|
|user_id|integer|null: false,foreign_key: true|


#アソシエーション設計

##users
has_many :messages  
has_many :group_users

##messages
belongs_to :user  
belongs_to :group

##groups
belongs_to :user  
has_many :group_users  
has_many :messages

##group_users
belongs_to :user  
belongs_to :group