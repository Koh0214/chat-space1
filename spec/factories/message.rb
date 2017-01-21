FactoryGirl.define do
  factory :message do
    user
    group
    body    Faker::Lorem.sentence
    image   "hoge.png"
    created_at { Faker::Time.between(2.days.ago, Date.today, :all) }
  end
end
