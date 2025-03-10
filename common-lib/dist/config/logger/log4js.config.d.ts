export declare const log4jsConfig: {
    appenders: {
        out: {
            type: string;
            layout: {
                type: string;
                pattern: string;
            };
        };
        file: {
            type: string;
            filename: string;
            layout: {
                type: string;
                pattern: string;
            };
        };
    };
    categories: {
        default: {
            appenders: string[];
            level: string;
        };
        service: {
            appenders: string[];
            level: string;
        };
    };
};
