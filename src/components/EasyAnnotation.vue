<script>

import * as easyannotation from 'easyannotation'

export default {
    name: 'EasyAnnotation',

    render(createElement) {
        return createElement('img', {
            ref: 'imgElement',
            attrs: {
                src: this.src
            },
            on: {
                click: this.onImageClick
            }
        });
    },

    mounted() {
        if (!this.loadOnClick) {
            this.loadAnnotation();
        }
    },

    props: {
        src: {
            type: String,
            default: ''
        },

        format: {
            type: String,
            default: 'png',
            validator(x) {
                return ["png", "json", "xml", 'svg'].indexOf(x.toLowerCase()) !== -1;
            }
        },

        loadOnClick: {
            type: Boolean,
            default: false
        },

        config: {
            type: Object,
            default: () => ({})
        }
    },
    methods: {
        onImageClick() {
            if (this.loadOnClick) {
                this.loadAnnotation();
            }
        },

        loadAnnotation() {
            var me = this;
            if (!this.easyAnnnotation) {
                var format = easyannotation.ExportType.IMAGE;
                switch (this.format) {
                    case 'json':
                        format = easyannotation.ExportType.JSON;
                        break;
                    case 'xml':
                        format = easyannotation.ExportType.XML;
                        break;
                    case 'svg':
                        format = easyannotation.ExportType.SVG;
                        break;
                }
                this.easyAnnnotation = new easyannotation.AnnotatorContainer(this.$refs.imgElement,
                    this.config);
                this.easyAnnnotation.show(function (resp) {
                    me.$emit('save', resp);
                }, format);
            }
        }
    }
}

</script>