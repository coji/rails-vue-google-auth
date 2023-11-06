class HelloController < ApplicationController
  def index
    render json: { message: "Hello World!", params: params }
  end
end
