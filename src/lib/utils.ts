import * as changeCase from 'change-case';

export function toHeader(slug: string): string {
    let header = changeCase.capitalCase(slug);
    header = header.replace('Of', 'of');

    return header;
}
