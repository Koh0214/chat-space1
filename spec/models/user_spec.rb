require 'rails_helper'

describe User do
  it "is invalid without a name" do
  	user = User.new(name: "", email: "kkk@gmail.com" , password: "00000000", password_confirmation: "00000000")
  	user.valid?
  	expect(user.errors[:name]).to include("が入力されていません。")
  end

  it "is invalid without a email" do
    user = User.new(name: "kishi", email: "" , password: "00000000", password_confirmation: "00000000")
    user.valid?
    expect(user.errors[:email]).to include("が入力されていません。")
  end
end
