type Props = {
    page: number; pageSize: number; total: number;
    onPageChange: (p: number) => void;
};
export default function Pagination({ page, pageSize, total, onPageChange }: Props) {
    const pages = Math.max(1, Math.ceil(total / pageSize));
    return (
        <div className="flex items-center justify-center gap-2 my-4">
            <button className="border px-3 py-1 rounded"
                disabled={page <= 1} onClick={() => onPageChange(page - 1)}>Anterior</button>
            <span className="text-sm">Página {page} de {pages}</span>
            <button className="border px-3 py-1 rounded"
                disabled={page >= pages} onClick={() => onPageChange(page + 1)}>Siguiente</button>
        </div>
    );
}
