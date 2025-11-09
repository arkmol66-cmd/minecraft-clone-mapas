#include "world.h"
#include <cstdlib>
#include <cmath>
#include <cstring>
#include <random>

static int CHUNK_SIZE = 16;
static int CHUNK_HEIGHT = 64;
static std::mt19937 rng;

extern "C" {

void init_world(int seed){
    if(seed == 0) seed = (int)std::random_device{}();
    rng.seed(seed);
}

int get_chunk_size(){ return CHUNK_SIZE; }
int get_chunk_height(){ return CHUNK_HEIGHT; }

uint8_t* generate_chunk(int chunkX, int chunkZ){
    const int size = CHUNK_SIZE * CHUNK_HEIGHT * CHUNK_SIZE;
    uint8_t* data = (uint8_t*)malloc(size);
    if(!data) return nullptr;
    memset(data, 0, size);

    for(int x=0;x<CHUNK_SIZE;x++){
      for(int z=0;z<CHUNK_SIZE;z++){
        int wx = chunkX * CHUNK_SIZE + x;
        int wz = chunkZ * CHUNK_SIZE + z;
        double h = 8.0 + 6.0 * (0.5 + 0.5*sin(wx*0.12) * cos(wz*0.09));
        h += (rng() % 3);
        int H = std::min(CHUNK_HEIGHT-1, std::max(1, (int)std::floor(h)));
        for(int y=0;y<=H;y++){
          uint8_t id = 1;
          if(y==H) id = 2;
          if(y < H-4) id = 3;
          int idx = (y * CHUNK_SIZE + z) * CHUNK_SIZE + x;
          data[idx] = id;
        }
      }
    }
    return data;
}

void free_chunk(uint8_t* p){
    if(p) free(p);
}
}
