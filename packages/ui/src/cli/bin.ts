#!/usr/bin/env node
import { main } from "./index";

const argv = process.argv.slice(2).filter((arg) => arg !== "--");

main(argv).catch(console.error);
