const Session = require('./session');

const SessionStore = {
  sessions: new Map(),

  createSession () {
    const session = new Session();
    this.sessions.set(session.id, session);

    return session;
  },

  findSession (sessionID) {
    return this.sessions.get(sessionID);
  }
};

module.exports = SessionStore;
