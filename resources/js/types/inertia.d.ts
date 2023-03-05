import type { Errors, ErrorBag, Page, PageProps } from '@inertiajs/vue3/types/types';

declare module "@inertiajs/vue3" {
    export function usePage<T extends PageProps>(): Page<T>
}

declare global {
    interface StatisticsProps extends Page<PageProps> {
        props: {
            app: {
                statistics: {
                    counts: {
                        [key: string]: string
                    }
                    patreon: {
                        data: {
                            id: string;
                            type: string;

                        };
                        included: {
                            attributes: {
                                amount_cents: number;
                                completed_percentage: number;
                                description: string;
                            }
                            id: string;
                            type: string;
                        }[];
                    };
                };
            };
        };
    }

    interface SettingsProps extends Page<PageProps> {
        props: {
            app: {
                settings: {
                    [key: string]: object
                }
            };
        };
    }
}
