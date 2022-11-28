const PROXY_CONFIG = [
  {
    context: ["/user", "/dashboard", "/bin"],
    target: "http://localhost:3000",
    secure: false,
    logLevel: "debug",
  },
];

module.exports = PROXY_CONFIG;
