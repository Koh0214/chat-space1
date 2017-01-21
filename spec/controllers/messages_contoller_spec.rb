require 'rails_helper'

describe MessagesController, type: :controller do

  describe 'GET #index' do
    let(:user) { FactoryGirl.create(:user) }
    let(:message) { FactoryGirl.create(:message) }

    before do
      login_user user
      @group = user.groups.first
      get :index, params: { group_id: @group.id }
    end

    it "renders the :index template" do
      expect(response).to render_template :index
    end

    it "assigns the requested contact to @group" do
      expect(assigns(:group)).to eq @group
    end

    it "assigns the requested contact to @groups" do
      groups = user.groups
      expect(assigns(:groups)).to eq groups
    end

    it "assigns the requested contact to @messages" do
      messages = @group.messages
      expect(assigns(:messages)).to eq messages
    end

  end

  # describe 'POST #create' do
  #   it "renders the :group_messages_path template" do
  #     post :create
  #     expect(response).to render_template :group_messages_path
  #   end
  # end
end
