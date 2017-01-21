require 'rails_helper'

describe MessagesController, type: :controller do
  let(:user) { FactoryGirl.create(:user) }

  describe 'GET #index' do
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

  describe 'POST #create' do
    before do
      login_user user
    end

    it "renders the :group_messages_path template" do
      group = user.groups.first
      message = user.messages.first
      post :create, params: { group_id: group.id, message: { body: message.body } }
      expect(response).to redirect_to group_messages_path
    end

    it "show the alert message when message does not save" do
      group = user.groups.first
      message = user.messages.first
      post :create, params: { group_id: group.id, message: { body: "" } }
      expect(response).to redirect_to group_messages_path
      expect(flash[:alert]).to be_present
    end
  end
end
