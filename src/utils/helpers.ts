export function cleanup(str: string){
    return str.replace(/^[^a-zA-Z0-9]+|[^a-zA-Z0-9]+$/g, '');
}