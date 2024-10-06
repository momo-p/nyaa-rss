ARG  BUN_IMAGE=oven/bun:1.1.29

FROM ${BUN_IMAGE}

WORKDIR /build/

COPY . .

RUN bun install --frozen-lockfile

EXPOSE 3000/tcp

ENTRYPOINT ["bun", "run", "/build/src/index.ts"]
