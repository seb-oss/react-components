interface XHRResponse<T = any> {
    status: number;
    data: T;
}

export function httpGet<T = any>(url: string): Promise<XHRResponse<T>> {
    return new Promise<XHRResponse<T>>((resolve: (response: XHRResponse<T>) => void, reject: (error: XHRResponse) => void) => {
        let xhr = new XMLHttpRequest();

        xhr.onload = function () {
            resolve({
                status: xhr.status,
                data: JSON.parse(xhr.response),
            });
        };

        xhr.onerror = function () {
            reject({
                status: xhr.status,
                data: JSON.parse(xhr.response),
            });
        };

        xhr.open("get", url);
        xhr.send();
    });
}
