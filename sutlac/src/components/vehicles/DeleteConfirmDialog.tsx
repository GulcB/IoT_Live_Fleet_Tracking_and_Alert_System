import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
    CircularProgress,
} from "@mui/material";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

interface DeleteConfirmDialogProps {
    open: boolean;
    vehiclePlate: string;
    onConfirm: () => void;
    onCancel: () => void;
    loading?: boolean;
}

const DeleteConfirmDialog = ({
    open,
    vehiclePlate,
    onConfirm,
    onCancel,
    loading = false,
}: DeleteConfirmDialogProps) => {
    return (
        <Dialog
            open={open}
            onClose={onCancel}
            maxWidth="xs"
            fullWidth
            PaperProps={{
                sx: {
                    borderRadius: 3,
                },
            }}
        >
            <DialogTitle
                sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                    color: "#dc2626",
                }}
            >
                <WarningAmberIcon />
                <Typography variant="h6" fontWeight={600}>
                    Delete Vehicle
                </Typography>
            </DialogTitle>

            <DialogContent>
                <Typography variant="body1" color="text.secondary">
                    Are you sure you want to delete vehicle{" "}
                    <strong>{vehiclePlate}</strong>? This action cannot be undone.
                </Typography>
            </DialogContent>

            <DialogActions sx={{ px: 3, pb: 3 }}>
                <Button
                    onClick={onCancel}
                    variant="outlined"
                    disabled={loading}
                    sx={{
                        textTransform: "none",
                        borderColor: "#e2e8f0",
                        color: "#64748b",
                    }}
                >
                    Cancel
                </Button>
                <Button
                    onClick={onConfirm}
                    variant="contained"
                    disabled={loading}
                    sx={{
                        textTransform: "none",
                        backgroundColor: "#ef4444",
                        "&:hover": { backgroundColor: "#dc2626" },
                    }}
                >
                    {loading ? <CircularProgress size={20} color="inherit" /> : "Delete"}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default DeleteConfirmDialog;
