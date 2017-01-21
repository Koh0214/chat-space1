require 'rails_helper'

describe User do
  context "---valid---" do
    context "with a nickname, email, password, password_confirmation" do
      it "is valid " do
        user = build(:user)
        expect(user).to be_valid
      end
    end

    context "with a password that has more than 8 characters" do
      it "is valid " do
        user = build(:user, password: "12345678", password_confirmation: "12345678")
        expect(user).to be_valid
      end
    end
  end

  context "---invalid---" do
    context "without a name" do
      it "is invalid" do
        user = build(:user, name: "")
        user.valid?
        expect(user.errors[:name]).to include("が入力されていません。")
      end
    end

    context "without a email" do
      it "is invalid" do
        user = build(:user, email: "")
        user.valid?
        expect(user.errors[:email]).to include("が入力されていません。")
      end
    end

    context "without a password" do
      it "is invalid" do
        user = build(:user, password: "")
        user.valid?
        expect(user.errors[:password]).to include("が入力されていません。")
      end
    end

    context "without a password_confirmation" do
      it "is invalid" do
        user = build(:user, password_confirmation: "")
        user.valid?
        expect(user.errors[:password_confirmation][0]).to include("が内容とあっていません。")
      end
    end

    context "with a duplicate email address" do
      it "is invalid" do
        user = create(:user)
        another_user = build(:user, email: user.email)
        another_user.valid?
        expect(another_user.errors[:email]).to include("は既に使用されています。")
      end
    end

    context "with a password that has less than 6 characters" do
      it "is invalid" do
        user = build(:user, password: "12345")
        user.valid?
        expect(user.errors[:password][0]).to include("は6文字以上に設定して下さい。")
      end
    end
  end
end
