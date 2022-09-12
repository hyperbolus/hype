import { h } from 'vue'

const applyMarks = (marks) => {
    let classes = [];
    for (let mark in marks) {
        switch(marks[mark].type) {
            case 'bold':
                classes.push('font-bold')
                break;
            case 'italic':
                classes.push('italic')
                break;
            case 'strike':
                classes.push('line-through')
                break;
        }
    }
    return classes.join(' ')
}

const parse = (data) => {
    let nodes = []
    for(let node in data) {
        if(data[node].type === 'paragraph') {
            nodes.push(h('p', parse(data[node].content)))
        }

        if(data[node].type === 'text') {
            nodes.push(h('span', {class: applyMarks(data[node].marks)}, data[node].text))
        }
    }

    return nodes
}

const RichText = (props, context) => {
    return h('div', context.attrs, parse(props.json, context))
}

RichText.props = ['json']

export default RichText
