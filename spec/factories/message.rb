FactoryGirl.define do
  factory :message do
    body      "やっほ！！"
    group_id  1
    user_id   1
    image "hoge.png"
    created_at { Faker::Time.between(2.days.ago, Date.today, :all) }
  end
end
