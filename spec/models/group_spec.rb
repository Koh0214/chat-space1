FactoryGirl.define do
  factory :group do
    id 1
    name  "グルーーーープ！"
    created_at { Faker::Time.between(2.days.ago, Date.today, :all) }
    updated_at { Faker::Time.between(2.days.ago, Date.today, :all) }
  end
end
