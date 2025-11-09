#include <GLFW/glfw3.h>
#include <iostream>
#include <thread>
#include <atomic>

std::atomic<bool> running(true);

void ws_thread_func(){
    // Implementar cliente WebSocket aqui (ixwebsocket, websocketpp, etc.)
    std::cout << "Thread WS rodando (implemente a lib desejada)\n";
    while(running){ std::this_thread::sleep_for(std::chrono::milliseconds(100)); }
}

int main(){
    if(!glfwInit()){ std::cerr<<"GLFW init failed\n"; return -1; }
    GLFWwindow* win = glfwCreateWindow(1280,720,"Native OpenGL Client", NULL, NULL);
    if(!win){ std::cerr<<"Failed create window\n"; glfwTerminate(); return -1; }
    glfwMakeContextCurrent(win);
    glEnable(GL_DEPTH_TEST);

    std::thread ws_thread(ws_thread_func);

    while(!glfwWindowShouldClose(win)){
        int w,h; glfwGetFramebufferSize(win,&w,&h); glViewport(0,0,w,h);
        glClearColor(0.53f,0.81f,0.98f,1.0f); glClear(GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT);

        // placeholder render
        glBegin(GL_TRIANGLES);
        glColor3f(0.8f,0.6f,0.4f);
        glVertex3f(-0.6f,-0.4f,0.0f); glVertex3f(0.6f,-0.4f,0.0f); glVertex3f(0.0f,0.6f,0.0f);
        glEnd();

        glfwSwapBuffers(win); glfwPollEvents();
    }

    running = false;
    ws_thread.join();
    glfwDestroyWindow(win); glfwTerminate();
    return 0;
}
