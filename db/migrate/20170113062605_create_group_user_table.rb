class CreateGroupUserTable < ActiveRecord::Migration[5.0]
  def change
    create_table :group_users do |t|
      t.integer   	:user_id,  null: false
      t.references  :group, null: false
      t.timestamps
    end
  end
end
