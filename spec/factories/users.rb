FactoryGirl.define do

	pass = Faker::Internet.password(8)

  factory :user do
    name                  Faker::Name.name
    email                 Faker::Internet.email
    password              pass
    password_confirmation pass

    after(:create) do |user|
      3.times do
        create(:group_user, user: user, group: create(:group))
      end
    end
  end

  factory :group do
    name         Faker::Name.name
    created_at { Faker::Time.between(2.days.ago, Date.today, :all) }
    updated_at { Faker::Time.between(2.days.ago, Date.today, :all) }
  end

  factory :group_user do
    user
    group
  end

end
