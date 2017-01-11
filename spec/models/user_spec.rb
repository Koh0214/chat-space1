require 'rails_helper'

describe User do
  it "is valid with a nickname, email, password, password_confirmation" do
    user = build(:user)
    expect(user).to be_valid
  end

  it "is invalid with a duplicate email address" do
    user = create(:user)
    another_user = build(:user, email: user.email)
    another_user.valid?
    expect(another_user.errors[:email]).to include("は既に使用されています。")
  end

  it "is invalid without a name" do
  	user = build(:user, name: "")
  	user.valid?
  	expect(user.errors[:name]).to include("が入力されていません。")
  end

  it "is invalid without a email" do
    user = build(:user, email: "")
    user.valid?
    expect(user.errors[:email]).to include("が入力されていません。")
  end

  it "is invalid without a password" do
    user = build(:user, password: "")
    user.valid?
    expect(user.errors[:password]).to include("が入力されていません。")
  end
end

