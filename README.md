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
|group_id|integer|null: false, foreign_key: true,|
|user_id|integer|null: false, foreign_key: true|


##groups
|column|data type|    keys   |
|:----:|:-------:|:---------:|
|id|||
|name|string|null: false, unique: true|

##group_users
|column|data type|    keys   |
|:----:|:-------:|:---------:|
|id|||
|group_id|integer|null: false, foreign_key: true|
|user_id|integer|null: false, foreign_key: true|


#アソシエーション設計

##users
has_many :group_users  
has_many :groups, through: :group_users  
has_many :messages  

##messages
belongs_to :user  
belongs_to :group

##groups 
has_many :group_users  
has_many :users, through: :group_users  
has_many :messages

##group_users
belongs_to :user  
belongs_to :group