import { selectSearchQuery } from '~/features/search';
import { useAppSelector } from '~/store/hooks';

export function useHighlightText() {
    const searchQuery = useAppSelector(selectSearchQuery);

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
