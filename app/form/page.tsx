'use client'
import React from 'react';
import { ChevronRight, ChevronLeft, Building2, Users, Check, Upload } from 'lucide-react';
import questions from '@/src/data/questions';
import { useRouter } from 'next/navigation';

export default function Form(){
  const router = useRouter();
  const [currentStep, setCurrentStep] = React.useState(1);
  const [formData, setFormData] = React.useState<Record<string, string>>({});
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const currentQuestion = questions[currentStep - 1];
  const isLastStep = currentStep === questions.length;

  const validateCurrentStep = () => {
    const currentField = `step_${currentStep}`;
    const value = formData[currentField];
    
    if (!value || value.trim() === '') {
      setErrors(prev => ({ ...prev, [currentField]: 'Ce champ est requis' }));
      return false;
    }
    
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[currentField];
      return newErrors;
    });
    return true;
  };

  const handleNext = () => {
    if (validateCurrentStep()) {
      // Check if current question is about shoelaces being untied
      if (currentQuestion.question.includes("Vos lacets sont-ils défaits")) {
        const answer = formData[`step_${currentStep}`];
        if (answer === "Non") {
          // Redirect to lose page
          router.push('/lose');
          return;
        }
      }
      
      if (isLastStep) {
        handleSubmit();
      } else {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleInputChange = (value: string) => {
    const field = `step_${currentStep}`;
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
    
      console.log('Form submitted:', formData);
      // Redirect to loading page
      router.push('/loading');
    } catch (error) {
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStepCategory = (step: number) => {
    if (step <= 2) return 0;
    if (step === 3) return 1;
    if (step === 4) return 2;
    return 3;
  };

  return (
    <>
      
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="container mx-auto px-4 py-8">
          <div className="flex gap-8 max-w-6xl mx-auto">
            
            {/* Side navigation */}
            <div className="hidden lg:block w-80 flex-shrink-0">
              <div className="sticky top-8">
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-6">Progression</h3>
                  <div className="space-y-4">
                    {[
                      { title: 'Type et marque', icon: Building2, steps: [1,2] },
                      { title: 'Pointure', icon: Users, steps: [3] },
                      { title: 'État des lacets', icon: Check, steps: [4] },
                      { title: 'Preuve visuelle', icon: Upload, steps: [5] }
                    ].map((category, index) => {
                      const Icon = category.icon;
                      const isActive = getStepCategory(currentStep) === index;
                      const isCompleted = category.steps.every(step => formData[`step_${step}`]);
                      
                      return (
                        <div 
                          key={index}
                          className={`flex items-center p-3 rounded-lg transition-all ${
                            isActive ? 'bg-blue-50 border-2 border-blue-200' : 
                            isCompleted ? 'bg-green-50 border-2 border-green-200' : 
                            'bg-gray-50 border-2 border-transparent'
                          }`}
                        >
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            isActive ? 'bg-blue-600 text-white' :
                            isCompleted ? 'bg-green-600 text-white' :
                            'bg-gray-300 text-gray-600'
                          }`}>
                            {isCompleted ? <Check className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
                          </div>
                          <div className="ml-3">
                            <p className={`font-medium ${
                              isActive ? 'text-blue-800' :
                              isCompleted ? 'text-green-800' :
                              'text-gray-600'
                            }`}>
                              {category.title}
                            </p>
                            <p className="text-sm text-gray-500">
                              {category.steps.length} étapes
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Main form */}
            <div className="flex-1">
              {/* Progress bar */}
              <div className="mb-8">
                <div className="flex justify-between text-sm text-gray-600 mb-3">
                  <span className="font-medium">Étape {currentStep} sur {questions.length}</span>
                  <span className="text-blue-600 font-medium">{Math.round((currentStep / questions.length) * 100)}% complété</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-700 ease-out shadow-sm"
                    style={{ width: `${(currentStep / questions.length) * 100}%` }}
                  ></div>
                </div>
              </div>

              {/* Form card */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
                <div className="p-8">
                  <div className="mb-6">
                    <div className="flex items-center mb-4">
                      <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                        {currentStep}
                      </div>
                      <div className="ml-3">
                        <p className="text-sm text-gray-500 uppercase tracking-wide">Question {currentStep}</p>
                      </div>
                    </div>
                  </div>

                  <RenderQuestion 
                    label={currentQuestion.question} 
                    type={currentQuestion.type} 
                    options={currentQuestion.options}
                    choises={currentQuestion.choises}
                    value={formData[`step_${currentStep}`] || ''}
                    onChange={handleInputChange}
                    error={errors[`step_${currentStep}`]}
                  />
                </div>

                {/* Navigation footer */}
                <div className="bg-gray-50 px-8 py-6 border-t border-gray-100">
                  <div className="flex justify-between items-center">
                    <button
                      onClick={handlePrevious}
                      disabled={currentStep === 1}
                      className={`flex items-center space-x-2 px-5 py-2.5 rounded-lg font-medium transition-all ${
                        currentStep === 1 
                          ? 'text-gray-400 cursor-not-allowed' 
                          : 'text-gray-700 hover:bg-gray-200 border border-gray-300'
                      }`}
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <span>Précédent</span>
                    </button>

                    <button
                      onClick={handleNext}
                      disabled={isSubmitting}
                      className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-2.5 rounded-lg font-medium hover:from-blue-700 hover:to-blue-800 transition-all flex items-center space-x-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Envoi en cours...</span>
                        </>
                      ) : (
                        <>
                          <span>{isLastStep ? 'Terminer' : 'Continuer'}</span>
                          <ChevronRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

interface RenderQuestionProps{
  label: string;
  type: 'text' | 'number' | 'option' | 'choise' | 'file';
  options?: string[];
  choises?: string[];
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

const RenderQuestion: React.FC<RenderQuestionProps> = ({
  label, 
  type, 
  options,
  choises, 
  value, 
  onChange, 
  error
}) => {
  return (
    <div className="space-y-4">
      <label className="block text-2xl font-semibold text-gray-800 leading-relaxed">
        {label}
      </label>
      
      {error && (
        <div className="text-red-600 text-sm font-medium bg-red-50 border border-red-200 rounded-lg p-3">
          {error}
        </div>
      )}

      {type === 'option' ? (
        <div className="space-y-3">
          {options?.map((option, index) => (
            <label 
              key={index} 
              className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all hover:bg-blue-50 ${
                value === option 
                  ? 'border-blue-500 bg-blue-50 text-blue-800' 
                  : 'border-gray-200 hover:border-blue-300'
              }`}
            >
              <input
                type="radio"
                name="option"
                value={option}
                checked={value === option}
                onChange={(e) => onChange(e.target.value)}
                className="w-5 h-5 text-blue-600 border-2 border-gray-300 focus:ring-blue-500 focus:ring-2"
              />
              <span className="ml-3 text-lg font-medium">{option}</span>
            </label>
          ))}
        </div>
      ) : type === 'choise' ? (
        <div className="space-y-3">
          {choises?.map((choise, index) => (
            <label 
              key={index} 
              className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all hover:bg-blue-50 ${
                value === choise 
                  ? 'border-blue-500 bg-blue-50 text-blue-800' 
                  : 'border-gray-200 hover:border-blue-300'
              }`}
            >
              <input
                type="radio"
                name="choise"
                value={choise}
                checked={value === choise}
                onChange={(e) => onChange(e.target.value)}                className="w-5 h-5 text-blue-600 border-2 border-gray-300 focus:ring-blue-500 focus:ring-2"              />
              <span className="ml-3 text-lg font-medium">{choise}</span>
            </label>
          ))}
        </div>
      ) : type === 'file' ? (
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
          <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <input
            type="file"
            onChange={(e) => onChange(e.target.files?.[0]?.name || '')}
            className="hidden"
            id="file-upload"
            accept="image/*"
          />
          <label
            htmlFor="file-upload"
            className="cursor-pointer text-blue-600 hover:text-blue-700 font-medium"
          >
            Cliquez pour télécharger un fichier
          </label>
          <p className="text-gray-500 text-sm mt-2">ou glissez-déposez votre image ici</p>
          {value && (
            <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-800 font-medium">Fichier sélectionné: {value}</p>
            </div>
          )}
        </div>
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full p-4 text-lg border-2 rounded-lg transition-all focus:ring-4 focus:ring-blue-100 ${
            error 
              ? 'border-red-300 focus:border-red-500' 
              : 'border-gray-300 focus:border-blue-500'
          }`}
          placeholder={type === 'text' ? 'Tapez votre réponse...' : 'Entrez un nombre...'}
        />
      )}
    </div>
  );
};