
function AudioSpectrum(src) {
    var self = this;
    this.initialised = false;
    this.startFromSeconds = 0;
    this.playing = false;

    // set up AudioContext
    window.AudioContext = window.AudioContext || window.webkitAudioContext;

    var audio = this.audio = new Audio(),
        context = this.context = new window.AudioContext(),
        analyser = this.analyser = context.createAnalyser(),
        source,
        processor
    ;

    audio.addEventListener('canplaythrough', function(){
        initAudioElement();
    });

    audio.controls = true;
    audio.loop = true;
    audio.autoplay = false;

    document.body.appendChild(audio);


    this.play = function(fromSecs){
        fromSecs = fromSecs || 0;
        if (source && source.buffer){
            source.start(fromSecs);
        } else if (this.data){
            this.loadFileData(this.data);
            return;
        } else {
            if (fromSecs){
                audio.currentTime = fromSecs;
            }
            audio.play();
        }
        source.playStarted = source.context.currentTime;
        this.playing = true;
    };
    this.stop = function(){
        if (source){
            if (source.buffer){
                source.stop(0);
                this.source = source = null;
            }
        }
        this.playing = false;
    };

    this.currentTime = function() {
        if (source.buffer){
            return source.context.currentTime - source.playStarted;
        } else {
            return audio.currentTime;
        }
    };

    function _init(){

        // set up connections
        source.connect(analyser);
        analyser.connect(context.destination);

        // set up byte data
        self.freqByteData = new Uint8Array(analyser.frequencyBinCount);
        // self.timeByteData = new Uint8Array(analyser.frequencyBinCount);

        self.initialised = true;

        self.play(self.startFromSeconds);

        if (self.onInitialised){
            self.onInitialised.call(this);
        }
    }

    this.loadAudioElement = function(src){
        this.initialised = false;
        audio.src = src;
    };
    function initAudioElement() {
        if (source){ source.disconnect(); }
        self.source = source = context.createMediaElementSource(audio);
        _init();
    }

    this.loadFileData = function(data){
        this.data = data;
        this.initialised = false;

        if (source){ source.disconnect(); }
        self.source = source = context.createBufferSource();

        if (context.decodeAudioData){
            context.decodeAudioData(data, function(buffer){
                source.buffer = buffer;
                _init();
            },function(e){
                throw e;
            });
        } else {
            source.buffer = context.createBuffer(data, false);
            _init();
        }
    };

    this.createAudio = function(){

    };

    this.update = function() {
        if (this.initialised){
            analyser.smoothingTimeConstant = 0.1;
            analyser.getByteFrequencyData(this.freqByteData);
            // analyser.getByteTimeDomainData(this.timeByteData);
        }
    };

    if (src){
        this.loadAudioElement(src);
    }
}