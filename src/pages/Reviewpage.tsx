'use client';

import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useUser } from '@/context/UserContext';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { Edit2, Eye, EyeOff } from 'lucide-react';
import { ThemeToggle } from '@/components/core/ThemeToggle';

type FormShape = {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
};

const ReviewPage: React.FC = () => {
  // location.state should contain the form data that you navigated with
  const { state } = useLocation() as { state?: Partial<FormShape> };
  const navigate = useNavigate();
  const {setUser} = useUser()
  if (!state) {
    return (
      <div className="max-w-5xl mx-auto p-6 text-center">
        <h1 className="text-2xl font-bold text-destructive mb-4">
          No Data Available
        </h1>
        <p className="text-muted-foreground">
          It looks like you navigated here directly. Please fill the signup form
          first.
        </p>
        <div className="mt-4">
          <Button onClick={() => navigate(-1)}>Go Back</Button>
        </div>
      </div>
    );
  }

  // initial form data comes from location.state (fallback to empty strings)
  const initial: FormShape = {
    name: state.name ?? '',
    email: state.email ?? '',
    phone: state.phone ?? '',
    password: state.password ?? '',
    confirmPassword: state.confirmPassword ?? '',
  };

  const [formData, setFormData] = useState<FormShape>(initial);

  // which field is being edited (null = no dialog)
  const [editingField, setEditingField] = useState<string | null>(null);

  // temporary values used inside the modal (preloaded from formData on open)
  const [tempValues, setTempValues] = useState<FormShape>(initial);

  // modal-only states
  const [modalError, setModalError] = useState<string>('');
  const [showTempPassword, setShowTempPassword] = useState(false);

  const handleOpenDialog = (field: string) => {
    setEditingField(field);
    setTempValues(formData); // preload
    setModalError('');
    setShowTempPassword(false);
  };

  const handleCloseDialog = () => {
    setEditingField(null);
    setTempValues(formData);
    setModalError('');
    setShowTempPassword(false);
  };

  const handleSaveDialog = () => {
    if (!editingField) return;

    // If editing password / confirmPassword, validate both together
    if (editingField === 'password' || editingField === 'confirmPassword') {
      if (!tempValues.password) {
        setModalError('Password cannot be empty');
        return;
      }
      if (tempValues.password.length < 6) {
        setModalError('Password must be at least 6 characters');
        return;
      }
      if (tempValues.password !== tempValues.confirmPassword) {
        setModalError('Passwords do not match');
        return;
      }

      setFormData(prev => ({
        ...prev,
        password: tempValues.password,
        confirmPassword: tempValues.confirmPassword,
      }));
    } else {
      // single-field edits
      const value = (tempValues as any)[editingField]?.toString() ?? '';
      if (!value.trim()) {
        setModalError('Value cannot be empty');
        return;
      }
      setFormData(prev => ({ ...prev, [editingField]: value }));
    }

    handleCloseDialog();
  };

  

  const handleConfirm = () =>
  {
    setUser({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
    });
    // final submit - replace with API call or navigation
    console.log('Final Data Submitted:', formData);
    navigate('/settings'); // or wherever
  };

  const masked = (val: string) => {
    if (!val) return '—';
    // show a fixed-length mask instead of real length for security
    return '••••••••';
  };

  const fields = [
    { key: 'name', label: 'Full name' },
    { key: 'email', label: 'Email' },
    { key: 'phone', label: 'Phone' },
    { key: 'password', label: 'Password' },
    { key: 'confirmPassword', label: 'Confirm password' },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 py-8">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      <Card className="w-full max-w-2xl shadow-md text-primary border rounded-xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            Review Your Details
          </CardTitle>
          <CardDescription>
            Please confirm your information before continuing.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {fields.map(f => (
            <div key={f.key}>
              <Label className="mb-2">{f.label}</Label>
              <div className="flex items-center justify-between gap-4">
                <div className="flex-1">
                  <p className="text-foreground">
                    {f.key === 'password' || f.key === 'confirmPassword'
                      ? masked((formData as any)[f.key])
                      : (formData as any)[f.key] || '—'}
                  </p>
                </div>

                <div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleOpenDialog(f.key)}
                    aria-label={`Edit ${f.label}`}
                  >
                    <Edit2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <Separator className="my-3" />
            </div>
          ))}
        </CardContent>

        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => navigate(-1)}>
            Back
          </Button>

          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              onClick={() => console.log('Save draft (if needed)', formData)}
            >
              Save draft
            </Button>
            <Button
              onClick={handleConfirm}
              className="bg-gradient-to-r from-amber-400 via-rose-500 to-fuchsia-600 text-white"
            >
              Confirm & Continue
            </Button>
          </div>
        </CardFooter>
      </Card>

      {/* Dialog (controlled) */}
      <Dialog
        open={editingField !== null}
        onOpenChange={open => {
          if (!open) handleCloseDialog();
        }}
      >
        {editingField && (
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="capitalize">
                Edit{' '}
                {editingField === 'confirmPassword' ? 'Password' : editingField}
              </DialogTitle>
            </DialogHeader>

            {/* If editing password area, show both password & confirm inputs */}
            {editingField === 'password' ||
            editingField === 'confirmPassword' ? (
              <div className="space-y-3">
                <Label>New password</Label>
                <div className="relative">
                  <Input
                    type={showTempPassword ? 'text' : 'password'}
                    value={tempValues.password}
                    onChange={e =>
                      setTempValues(prev => ({
                        ...prev,
                        password: e.target.value,
                      }))
                    }
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowTempPassword(v => !v)}
                    className="absolute right-2 top-2 p-1"
                    aria-label="toggle show password"
                  >
                    {showTempPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>

                <Label>Confirm password</Label>
                <div className="relative">
                  <Input
                    type={showTempPassword ? 'text' : 'password'}
                    value={tempValues.confirmPassword}
                    onChange={e =>
                      setTempValues(prev => ({
                        ...prev,
                        confirmPassword: e.target.value,
                      }))
                    }
                    placeholder="••••••••"
                  />
                </div>

                {modalError && (
                  <p className="text-sm text-red-500">{modalError}</p>
                )}
              </div>
            ) : (
              // single-field editor
              <div className="space-y-3">
                <Label className="capitalize">{editingField}</Label>
                <Input
                  value={(tempValues as any)[editingField]}
                  onChange={e =>
                    setTempValues(prev => ({
                      ...prev,
                      [editingField!]: e.target.value,
                    }))
                  }
                />
                {modalError && (
                  <p className="text-sm text-red-500">{modalError}</p>
                )}
              </div>
            )}

            <DialogFooter className="mt-4">
              <Button variant="secondary" onClick={handleCloseDialog}>
                Close
              </Button>
              <Button onClick={handleSaveDialog}>Save</Button>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
};

export default ReviewPage;
