require 'rails_helper'

describe User do
  context "valid" do
    it "is valid with a nickname, email, password, password_confirmation" do
      user = build(:user)
      expect(user).to be_valid
    end

    it "is valid with a password that has more than 8 characters " do
      user = build(:user, password: "12345678", password_confirmation: "12345678")
      expect(user).to be_valid
    end
  end
  
  context "invalid" do
    context "without something" do
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

      it "is invalid without a password_confirmation" do
        user = build(:user, password_confirmation: "")
        user.valid?
        expect(user.errors[:password_confirmation][0]).to include("が内容とあっていません。")
      end
    end

    context "invalid others" do
      it "is invalid with a duplicate email address" do
        user = create(:user)
        another_user = build(:user, email: user.email)
        another_user.valid?
        expect(another_user.errors[:email]).to include("は既に使用されています。")
      end

      it "is invalid with a password that has less than 8 characters " do
        user = build(:user, password: "1234567")
        user.valid?
        expect(user.errors[:password][0]).to include("は8文字以上に設定して下さい。")
      end
    end    
  end
end

