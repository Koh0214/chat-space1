require 'rails_helper'

describe Message do
  context "with body, user_id, group_id" do
    it "is valid" do
      message = build(:message)
      expect(message).to be_valid
    end
  end

  context "without body" do
    it "is invalid" do
      message = build(:message, body:"")
      message.valid?
      expect(message.errors[:body]).to include("が入力されていません。")
    end
  end

  context "without group_id" do
    it "is invalid" do
      message = build(:message, group_id: nil)
      message.valid?
      expect(message.errors[:group_id]).to include("が入力されていません。")
    end
  end

  context "without user_id" do
    it "is invalid" do
      message = build(:message, user_id: nil)
      message.valid?
      expect(message.errors[:user_id]).to include("が入力されていません。")
    end
  end

end
