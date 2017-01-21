FactoryGirl.define do

	pass = Faker::Internet.password(8)
  sequence(:name) { |n| "name#{n}" }

  factory :user do
    name
    email                 Faker::Internet.email
    password              pass
    password_confirmation pass

    after(:create) do |user|
      create(:message, user: user, group: create(:group))
    end

    after(:create) do |user|
      create(:group_user, user: user, group: create(:group))
    end

  end

  factory :group do
    name
    created_at { Faker::Time.between(2.days.ago, Date.today, :all) }
    updated_at { Faker::Time.between(2.days.ago, Date.today, :all) }
  end

  factory :group_user do
    user
    group
  end

  factory :message do
    user
    group
    body    Faker::Lorem.sentence
    image   "hoge.png"
    created_at { Faker::Time.between(2.days.ago, Date.today, :all) }
  end

end
