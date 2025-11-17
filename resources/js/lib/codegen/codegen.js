export const codegen = (lang, lib, data) => h(data, lib.boilerplate.trim());

export const list2kv = (list) => {
    let text = {};

    for (const parameter of list) text[parameter.key] = parameter.value;

    return text;
}

export const h = (props, template) => {
    const modifiers = {
        upper: x => x.toUpperCase(),
        lower: x => x.toLowerCase(),
        trim: x => x.trim(),
        kv: data => JSON.stringify(list2kv(data), null, 4),
    };

    template = template.replaceAll(
        /{{\s*([a-zA-Z_][a-zA-Z0-9_]*)\s*((?:\.[a-zA-Z_][a-zA-Z0-9_]*)*)\s*((?:\|[a-zA-Z_][a-zA-Z0-9_]*)*)\s*(\?{2}.*)?\s*}}/g,
        (substring, key, path, mods, fallback = '') => {
            let data = props[key];

            if (path.length > 0) for (const frag of path.substring(1).split('.')) data = data[frag];

            if (mods.length > 0) for (const mod of mods.substring(1).split('|')) data = modifiers[mod](data);

            return data;
        }
    );

    return template
}

export const dictionary = (language, library, data) => {
    let code = '';

    for (const dat of data.filter(_ => _.key !== '')) {
        code += library.parameter.replace('%KEY%', dat.key).replace('%VALUE%', dat.value);
    }

    if (library.slice && code.length > 0) code = code.slice(0, -library.slice) + '\n';
    if (code.length > 0 && library.wrap) code = '\n' + code;

    return code;
}

export const languages = (() => {
    const _langs = import.meta.glob('./languages/*.js', {eager: true, import: 'default'});
    const _templates = import.meta.glob('./templates/*', {eager: true, import: 'default', query: '?raw'});

    const list = {};

    for (const path in _langs) {
        const name = path.slice(12, -3);

        list[name] = _langs[path];

        for (const key in _langs[path].libraries) {
            const lib = _langs[path].libraries[key];
            lib.boilerplate = _templates['./templates/' + name + '_' + key] ?? `${name}:${key} is missing boilerplate`;
        }
    }

    return list;
})();
