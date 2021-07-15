const player = require('node-wav-player');

class WavPlayer {
    /**
     * @return {Promise<ReadableStream>}
     */
    static play(path) {
        return new Promise((resolve, reject) => {
            player.play({path: path}).then(() => {
                resolve();
            }).catch((error) => {
                console.error(error);
                reject(error);
            });
        });
    }
}

module.exports = WavPlayer;