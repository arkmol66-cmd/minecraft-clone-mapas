cmake_minimum_required(VERSION 3.10)
project(minecraft_native)
set(CMAKE_CXX_STANDARD 17)

find_package(OpenGL REQUIRED)
find_package(glfw3 REQUIRED)

add_executable(minecraft_native src/main.cpp)
target_link_libraries(minecraft_native PRIVATE glfw OpenGL::GL)
