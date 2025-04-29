import { useSelector } from 'react-redux';

import { selectSearchQuery } from '~/features/search';

export function useHighlightText() {
    const searchQuery = useSelector(selectSearchQuery);

    return function highlight(text: string) {
        if (searchQuery == '') return text;

        const regex = new RegExp(`(${searchQuery})`, 'gi');
        const parts = text.split(regex);

        return parts.map((part, i) =>
            regex.test(part) ? (
                <span key={i} style={{ color: '#2db100' }}>
                    {part}
                </span>
            ) : (
                part
            ),
        );
    };
}
