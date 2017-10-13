module.exports = class MT {

    constructor(template = '', data = {}) {
        this.template = template;
        this.data = data;
    }

    render() {
        return this.template.replace(/<%=(.*?)%>/g, (match, val) => {
            return this.data[val];
        })
    }
}