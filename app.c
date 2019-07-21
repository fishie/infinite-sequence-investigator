#include <emscripten.h>
#include <stdint.h>

EMSCRIPTEN_KEEPALIVE int32_t foobar();

int32_t foobar()
{
    return 42;
}
