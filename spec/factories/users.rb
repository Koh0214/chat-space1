FactoryGirl.define do

	pass = Faker::Internet.password(8)
  sequence(:name) { |n| "name#{n}" }

  factory :user do
    name
    email                 Faker::Internet.email
    password              pass
    password_confirmation pass

    after(:create) do |user|
      gro = create(:group)
      create(:message, user: user, group: gro)
      create(:group_user, user: user, group: gro)
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
