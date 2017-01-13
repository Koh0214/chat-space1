class MessagesController < ApplicationController
  def index
  	# binding.pry
  	@groups = Group.all
  	@group = Group.find(params[:group_id])
  end
end
