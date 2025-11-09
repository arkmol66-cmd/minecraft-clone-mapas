#pragma once
#include <cstdint>

extern "C" {
  void init_world(int seed);
  uint8_t* generate_chunk(int chunkX, int chunkZ);
  void free_chunk(uint8_t* p);
  int get_chunk_size();
  int get_chunk_height();
}
